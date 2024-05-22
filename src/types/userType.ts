export type User = {
    _id: string;
    name: NameObj
    email: string
    profilePicture: string
}

type NameObj = {
    familyName: string
    givenName: string
}
