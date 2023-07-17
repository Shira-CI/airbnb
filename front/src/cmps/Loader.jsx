import { TailSpin } from 'react-loader-spinner'

export const Loader = () => {
  return (
<TailSpin
  height="100"
  width="100"
  color="rgb(221, 221, 221)"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass="tail-spin-wrapper"
  visible={true}
/>
  )
}
