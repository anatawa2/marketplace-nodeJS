module.exports.slugify = (title, uid) => {
    let slugArr = []

    for (i in title) {
        if (i >= 30)
            break;

        let char = title[i].toLowerCase()
        if ((char >= 'a' && char <= 'z') || char >= 'ก' && char <= 'ฮ')
            slugArr.push(char)
        else
            slugArr.push('-')
    }
    return slugArr.join('').concat('-').concat(uid.toString().slice(-6,))
}