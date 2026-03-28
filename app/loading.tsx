export default function Loading() {
  return (
    <div className="flex flex-col items-center h-screen justify-center w-full">
      <video
        src="/loading.webm"
        autoPlay
        loop
        muted
        playsInline
        width={500}
        height={500}
        className="w-full h-fit"
      />
    </div>
  );
}
