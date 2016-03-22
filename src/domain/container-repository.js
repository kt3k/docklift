import {dockerode, Promise} from '../util'
import Container from './container'

/**
 * The repository class for the container models.
 */
export default class ContainerRepository {

  /**
   * Saves the container.
   * @param {Container} container The container
   * @return {Promise<Container>}
   */
  save(container) {

    if (container.hasId()) {

      // Does nothing and just updates the container
      return container.update()

    }

    return new Promise((resolve, reject) => dockerode.createContainer(this.containerToCreateOptions(container), (err, ctr) => {

      if (err) {

        return reject(err)

      }

      container.id = ctr.id

      return resolve(container.update())

    }))

  }

  /**
   * Creates the create options for a new container from the given container.
   * @private
   * @param {Container} container The container
   */
  containerToCreateOptions(container) {

    const options = {
      Image: container.image,
      Cmd: typeof container.cmd === 'string' ? container.cmd.split(/\s+/) : null,
      name: container.name,
      ExposedPorts: this.portsToExposedPorts(container.ports),
      HostConfig: {
        PortBindings: this.portsToPortBindings(container.ports)
      }
    }

    return options

  }

  /**
   * Converts the container's ports property to Remote API's ExposedPorts option.
   * @param {Array<string>} ports The ports property
   * @return {Object}
   */
  portsToExposedPorts(ports) {

    if (!(ports instanceof Array)) {

      return {}

    }

    const exposedPorts = {}

    ports.forEach(portPair => {

      const containerPort = portPair.split(':', 2)[1]

      exposedPorts[containerPort + '/tcp'] = {}

    })

    return exposedPorts

  }

  /**
   * Converts the ports options to PortBindings option for create API.
   * @param {Array<string>} ports The ports settings (The form of ['3306:3306', '9100:9100']
   * @return {Object}
   */
  portsToPortBindings(ports) {

    const portBindings = {}

    if (!(ports instanceof Array)) {

      return portBindings

    }

    ports.forEach(portPair => {

      const [hostPort, containerPort] = portPair.split(':', 2)

      portBindings[containerPort + '/tcp'] = [{HostPort: '' + hostPort}]

    })

    return portBindings

  }

  /**
   * @private
   * @param {Object}
   * @return {Array<string>}
   */
  static portBindingsToPorts(portBindings) {

    if (portBindings == null) {

      return []

    }

    return Object.keys(portBindings).map(containerPort => {

      const hostPort = portBindings[containerPort][0].HostPort

      containerPort = containerPort.split('/')[0]

      return `${hostPort}:${containerPort}`

    })

  }

  /**
   * Gets the container by its id. Returns null promise if the container does not exist.
   * @param {string} id The id of the container
   * @return {Promise<Container>}
   */
  getById(id) {

    return new Promise((resolve, reject) => {

      dockerode.getContainer(id).inspect((err, data) => {

        if (!err) {

          return resolve(ContainerRepository.apiDataToContainer(data))

        }

        if (err.statusCode === 404) {

          return resolve(null)

        }

        return reject(err)

      })

    })

  }

  /**
   * Gets a container by the given name.
   * @param {string} name The name of the container
   * @return {Promise<Container>}
   */
  getByName(name) {

    return this.getById(name)

  }

  /**
   * Removes the container.
   * @param {Container} container The container
   * @return
   */
  remove(container) {

    return new Promise((resolve, reject) => {

      dockerode.getContainer(container.id).remove({force: true}, (err, data) => {

        if (err) {
          return reject(err)
        }

        return resolve()

      })

    }).then(() => container.setRemoved())

  }

  /**
   * Converts the api data to an container model.
   * @private
   * @param {object} data The object which is returned from Docker Remote API
   * @return {Container}
   */
  static apiDataToContainer(data) {

    return new Container({
      id: data.Id,
      name: data.Name,
      image: data.Image,
      cmd: data.Config.Cmd.join(' '),
      isRunning: data.State.Running,
      ports: ContainerRepository.portBindingsToPorts(data.HostConfig.PortBindings)
    })

  }

}
