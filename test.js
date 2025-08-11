import person from './helloworld.js'

const man = person("John", "Doe", 18);

console.log(man.fullName(), man.isAdult() ? "is an adult" : "is not an adult");