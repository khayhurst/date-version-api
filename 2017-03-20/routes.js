/* eslint camelcase: 0 */
module.exports = () => {
  const fn1_20170320 = (req, res) => {
    res.status(200).send({ message: 'fn1_20170320 called' });
  };

  const fn2_20170320 = (req, res) => {
    res.status(200).send({ message: 'fn2_20170320 called' });
  };

  const updateVersions = (versions) => {
    versions.push({
      release: new Date('2017-03-20').getTime(),
      endpoints: [
        { url: '/fn1', method: 'GET', func: fn1_20170320 },
        { url: '/fn2', method: 'GET', func: fn2_20170320 }
      ]
    });
  };

  return { updateVersions };
};
