const t = [1, -1, 3]

console.log(t)

t.push(5)

console.log(t)
console.log(t.length)
console.log(t[1])
t[1] = 7
t[3] = 100

t.forEach(value => {
    console.log(value)
})