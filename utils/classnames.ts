function classnames(constants: string[], conditionals?: Record<string, boolean>): string {
  return constants.concat(
    Object.entries(conditionals || {})
      .filter(pair => pair[1])
      .map(pair => pair[0])
  ).join(' ');
}

export default classnames;
