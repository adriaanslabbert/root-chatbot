module.exports = {
  getEnv: function(envList, envName) {
    let currentEnv = envList[envName];
    const envs = [currentEnv];
    while (currentEnv.parent) {
      currentEnv = envList[currentEnv.parent];
      envs.unshift(currentEnv);
    }

    const mergedEnv = Object.assign(...envs);
    delete mergedEnv.parent;
    return mergedEnv;
  },

  // Use only for insecure applications! Not for UUIDs, keys, etc.
  randomNumberString: function(length) {
    let numbers = new Array(length);
    for (let i = 0; i < length; i++) {
      numbers[i] = Math.floor(Math.random() * 10);
    }
    return numbers.join("");
  }
};
