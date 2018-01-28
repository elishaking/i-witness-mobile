export interface Account {
    owner_id: number,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    gender: string,
    phone_number: string,
    image: string,
    witness: number,
    officer: number
}

export interface Report{
    title: string,
    message: string,
    location: string,
    witness: number
}

export interface Witness {
    id: number,
    token: string,
    account: Account,
    // reports: Report[]
}

export function getURL(){
    let mode = 'dep'
    return mode == 'dep' ? 'https://iwitnez.herokuapp.com/' : 'http://192.168.43.46:8000/';
}