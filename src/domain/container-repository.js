import dockerode from '../dockerode'
import Container from './container'
import {Promise} from 'es6-promise'

export default class ContainerRepository {

  /**
   * Saves the container.
   *
   * @param {Container} container The container
   */
  save(container) {
  }

  /**
   * Gets the container by its id. Returns null promise if the container does not exist.
   *
   * @param {string} id The id of the container
   * @return {Promise<Container>}
   */
  getById(id) {

    return new Promise((resolve, reject) => {

      dockerode.getContainer(id).inspect((err, data) => {

        if (err) {

          if (err.statusCode === 404) {

            resolve(null)

          } else {

            reject(err)

          }

          return
        }

        resolve(this.apiDataToContainer(data))

      })

    })

  }

  /**
   * Converts the api data to an container model.
   *
   * @private
   * @param {object} data The object which is returned from Docker Remote API
   * @return {Container}
   */
  apiDataToContainer(data) {

    const container = new Container(data.Id, data.Image, data.Name, data.State.Running)

    return container

  }

}