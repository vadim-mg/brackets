module.exports = function check(str, bracketsConfig) {
  const brackets = bracketsConfig.reduce((acc, val, i) => {
    const [op, cl] = val
    acc[op] = {
      isOpen: true,
      close: cl,
    }
    if (op !== cl) {
      acc[cl] = {
        isOpen: false,
        open: op,
      }
    } else {
      acc[op]["open"] = op
    }
    return acc
  }, {})

  const stack = []

  for (let i = 0; i < str.length; i++) {
    let bracket = brackets[str[i]]
    if (stack.length && stack[stack.length - 1] === bracket.open) {
      stack.pop()
      continue
    }
    if (bracket.isOpen) {
      stack.push(str[i])
      continue
    }
    return false
  }

  return stack.length ? false : true
}
