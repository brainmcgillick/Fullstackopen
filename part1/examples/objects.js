const object1 = {
    name: "Arto Hellas",
    age: 35,
    education: "PhD"
}

const object2 = {
    name: "Full Stack web application development",
    level: "intermediate studies",
    size: 5
}

const object3 = {
    name: {
        first: "Dan",
        last: "Abramov",
    },
    grades: [2, 3, 5, 3],
    department: "Stanford University",
}

console.log(object1)
console.log(object1.name)

const fieldName = "age"
console.log(object1[fieldName])

console.log(object3.name)
console.log(object3.name.first)

object1.address = "Helsinki"
object1["secret number"] = 12345

console.log(object1["secret number"])
console.log(object1.address)
console.log(object1["address"])