/**
 * Container obtaining DSL model.
 * @abstract
 */
export default class ContainerObtain {

  /**
   * @abstract
   * @return {Promise<Container>}
   */
  obtain() {}

  /**
   * Creates the container-obtain list.
   * @param {object|object[]} items The list of items
   * @param {object} params The params
   * @return {ContainerObtain[]}
   */
  static create(items, params) {

    if (items instanceof Array) {

      return this.createList(items, params)

    } else {

      return [this.createOne(items, params)]

    }

  }

  /**
   * @abstract
   * @param {object} item The item
   * @param {object} params The params
   */
  static createOne(item, params) {}

  /**
   * @param {object[]} items The list of items
   * @param {object} params The params
   */
  static createList(items, params) {

    return items.map(item => this.createOne(item, params))

  }

}
