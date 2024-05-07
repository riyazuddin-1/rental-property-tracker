let utilities = {};

utilities.parseDate = (d) => {
    return d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear()
}

module.exports = utilities;