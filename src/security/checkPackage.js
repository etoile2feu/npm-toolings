async function general(name) {
    // Even tough the package name is already check and choosen by the user, this check avoid malicious actor trying to lure people into malicious commands.

    if (!(/^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(`${name}`))) return 0 // check string is a package name
    if (`${name}` != `${encodeURIComponent(`${name}`)}`) return 0 // avoid escaping and other things
    if (name.length > 214) return 0
    return 1
}

export default { general };