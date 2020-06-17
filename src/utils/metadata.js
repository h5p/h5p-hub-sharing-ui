/**
 * Class wrapping in all metadata received from the backend
 */
export default class Metadata {
  constructor({ licenses, disciplines, languages, levels }) {
    const massageDatas = function (datas) {
      for (let i = 0; i < datas.length; i++) {
        datas[i].id = datas[i].name;
        datas[i].name = datas[i].translation ? datas[i].translation : datas[i].name;
      }
      return datas;
    }

    const hierarchicalDisciplines = (disciplines) => {
      //Create lookup table
      const lookupTable = {};
      for(let i=0; i<disciplines.length; i++) {
        lookupTable[disciplines[i].id] = disciplines[i];
      }

      //Add children to parents
      for(let i=0; i<disciplines.length; i++) {
        if(disciplines[i].parent !== null) {
          const parent = lookupTable[disciplines[i].parent];
          parent.children = parent.children ? parent.children.concat([disciplines[i]]) : [disciplines[i]];
        }
      }

      const hierarchicalList = [];

      //Add all disciplines without parent to list
      for(let discipline of Object.values(lookupTable)) {
        if(discipline.parent === null) {
          hierarchicalList.push(discipline);
        }
      }
      return hierarchicalList;
    }

    this.licenses = massageDatas(licenses);
    this.flatDisciplines = massageDatas(disciplines);
    this.disciplines =  hierarchicalDisciplines(this.flatDisciplines);
    this.languages = massageDatas(languages);
    this.levels = massageDatas(levels);
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

  getDiscipline = (id) => {
    for (let i = 0; i < this.flatDisciplines.length; i++) {
      // Note: intentionally not using trippel quotes. A mix of strings an ints
      if (this.flatDisciplines[i].id == id) {
        return this.flatDisciplines[i];
      }
    }
  }
};
