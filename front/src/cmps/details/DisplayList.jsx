
export const DisplayList = ({ list,children }) => {
  return (
    <ul>
      {list.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
      {children}
    </ul>
  )
}
