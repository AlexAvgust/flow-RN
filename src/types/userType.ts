export type User = {
    name: NameObj;
    email: string;
    profilePicture: string;
    tasks: string[];
}

type NameObj = {
    familyName: string,
    givenName: string
}