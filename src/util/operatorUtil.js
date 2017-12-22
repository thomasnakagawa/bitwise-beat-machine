const Operator = {
  acronymToObject: operatorAcronym => ({
    "ad": {
      method: ((a, b) => (a && b)),
      name: "AND"
    },
    "or": {
      method: ((a, b) => (a || b)),
      name: "OR"
    },
    "xr": {
      method: ((a, b) => (a || b) && !(a && b)),
      name: "XOR"
    },
    "na": {
      method: ((a, b) => !(a && b)),
      name: "NAND"
    },
    "no": {
      method: ((a, b) => !(a || b)),
      name: "NOR"
    },
    "nx": {
      method: ((a, b) => (a && b) || (!a && !b)),
      name: "NXOR"
    },
    "im": {
      method: ((a, b) => (!a || b)),
      name: "->"
    },
    "ri": {
      method: ((a, b) => (!b || a)),
      name: "<-"
    }
  }[operatorAcronym]),

  nameToAcronym: operatorName => ({
    "AND": "ad",
    "OR": "or",
    "XOR": "xr",
    "NAND": "na",
    "NOR": "no",
    "NXOR": "nx",
    "->": "im",
    "<-": "ri"
  }[operatorName]),

  names: [
    "AND", "OR", "XOR", "NAND", "NOR", "NXOR", "->", "<-"
  ]
}

export default Operator;
