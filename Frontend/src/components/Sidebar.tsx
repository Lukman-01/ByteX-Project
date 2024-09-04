import logo from "../assets/logo.png";

function Sidebar() {
  return (
    <aside className=" inset-y-0 bg-white left-0 z-10 flex h-full w-14 flex-col border-r bg-background sm:w-60">
      <div className="flex h-14 items-center justify-center border-b sm:justify-start sm:px-6">
        <a
          href="/"
          className="flex items-center gap-2 font-semibold"
          
        >
          <div className="lg:col-span-3">
            <h1 className=" text-2xl drop-shadow-2xl  text-gray-400 title">
              go<span className="text-[#D434FE]">ByteX</span>
            </h1>
          </div>
        </a>
      </div>
      <nav className="flex flex-1 flex-col items-center gap-4 px-2 py-6 sm:items-start sm:px-6">
        <a
          href="/dashboard"
          className="flex h-9 w-9 font-semibold hover:bg-[#a405cc] hover:text-white items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90 sm:h-10 sm:w-auto sm:gap-3 sm:rounded-md sm:px-4"
          
        >
          <HomeIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="hidden sm:inline">Dashboard</span>
        </a>
        <a
          href="/tracking"
          className="flex h-9 w-9 font-semibold hover:bg-[#a405cc] hover:text-white items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:h-10 sm:w-auto sm:gap-3 sm:rounded-md sm:px-4"
         
        >
          <TruckIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="hidden sm:inline">Track Product</span>
        </a>
      </nav>
    </aside>
  );
}
function HomeIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}


function TruckIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}

export default Sidebar;
