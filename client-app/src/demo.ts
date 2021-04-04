let data = 42;

//This is not a good idea as it reverse the objctive of 'Typescript'
//removing type safety
let data1: any = 42;
//or
let data2: number|string = 42;

//Objects
export interface Duck{
    name: string;
    legs: number;
    makeSound: (sound: string) => void;
}

const duck1: Duck = {
    name: 'oshan',
    legs:2,
    makeSound: (sound: any) => console.log(sound)
}

const duck2: Duck = {
    name: 'livi',
    legs:2,
    makeSound: (sound: any) => console.log(sound)
}


export const ducks = [duck1, duck2]




