/* eslint camelcase: "never" */
module.exports = () => {
  const fn1_20170120 = (req, res) => {
    res.status(200).send({ message: 'fn1_20170120 called' });
  };

  const fn2_20170120 = (req, res) => {
    res.status(200).send({ message: 'fn2_20170120 called' });
  };

  const updateVersions = (versions) => {
    versions.push({
      release: new Date('2017-01-20').getTime(),
      endpoints: [
        { url: '/fn1', method: 'GET', func: fn1_20170120 },
        { url: '/fn2', method: 'GET', func: fn2_20170120 }
      ]
    });
  };

  return { updateVersions };
};
