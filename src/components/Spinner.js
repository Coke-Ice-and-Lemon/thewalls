import Image from "next/image"

const Spinner = () => {
  return (
    <div className="w-14 h-35 md:w-20">
        <Image src='/vinyl.png' className="animate-spin" width={75} height={75} />
    </div>
  )
}
export default Spinner