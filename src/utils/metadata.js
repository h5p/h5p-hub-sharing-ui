/**
 * Class wrapping in all metadata received from the backend
 */
export default class Metadata {
  constructor({ licenses, disciplines, languages, levels }) {
    disciplines = Metadata.massageList(disciplines);

    this.disciplinesLookup = {};

    // Create lookup table
    for (let i = 0; i < disciplines.length; i++) {
      this.disciplinesLookup[disciplines[i].id] = disciplines[i];
    }

    this.licenses = Metadata.massageList(licenses);
    this.disciplines = Metadata.createHierarchy(disciplines, this.disciplinesLookup);
    this.languages = Metadata.massageList(languages);
    this.levels = Metadata.massageList(levels);
  }

  /**
   * Convert backend format to the format needed by the UX
   *
   * @param {*} list
   */
  static massageList(list) {
    return list.map(element => {
      return {...element, id: element.name, name: element.translation || element.name};
    });
  }

  /**
   * Create a hierarcical list based on a flat list (which gives the hierarchy through a parent field)
   *
   * @param {Array} flat
   * @param {Array} lookup
   * 
   * @returns {Array}
   */
  static createHierarchy(flat, lookup) {
    // Add children to parents
    for (let i = 0; i < flat.length; i++) {
      if (flat[i].parent !== null) {
        const parent = lookup[flat[i].parent];
        parent.children = parent.children ? parent.children.concat([flat[i]]) : [flat[i]];
      }
    }

    const hierarchicalList = [];

    // Add all disciplines without parent to list
    for (let discipline of Object.values(lookup)) {
      if (discipline.parent === null) {
        hierarchicalList.push(discipline);
      }
    }

    return hierarchicalList;
  }

  /**
   * Get a metadata by its ID
   *
   * @param {string} type 'licenses', 'disciplines', 'languages' or 'levels'
   * @param {string} id
   * @returns {object}
   */
  getById(type, id) {
    const container = this[type];

    for (let i=0; i < container.length; i++) {
      // Note: intentionally not using trippel quotes. A mix of strings an ints
      if (container[i].id == id) {
        return container[i];
      }
    }
  }

  /**
   * Get a license by its ID
   *
   * @param {string} id
   * @returns {object}
   */
  getLicense(id) {
    return this.getById('licenses', id);
  }

  /**
   * Get level object by its ID
   *
   * @param {string} id
   * @returns {object}
   */
  getLevel(id) {
    return this.getById('levels', id);
  }

  /**
   * Get language object by its ID
   *
   * @param {string} id
   * @returns {object}
   */
  getLanguage(id) {
    return this.getById('languages', id);
  }

  /**
   * Get license version by its ID
   *
   * @param {object} license
   * @param {string} id
   * @returns {object}
   */
  getLicenseVersion(license, id) {
    const versions = license.versions;
    for (let i=0; i < versions.length; i++) {
      // Note: intentionally not using trippel quotes. A mix of strings an ints
      if (versions[i].id == id) {
        return versions[i];
      }
    }
  }

  /**
   * Get license in a human readable format
   *
   * @param {string} id
   * @param {string} versionId
   * @returns {string}
   */
  getLicenseForHumans(id, versionId) {
    const license = this.getLicense(id);
    let forHumans = license.name;

    if (versionId) {
      const version = this.getLicenseVersion(license, versionId);
      if (version) {
        forHumans += ` ${version.name}`;
      }
    }

    return forHumans;
  }

  /**
   * Get a discipline for a given ID
   * 
   * @param {*} id 
   * @returns {Object}
   */
  getDiscipline = (id) => {
    return this.disciplinesLookup[id];
  }
};
