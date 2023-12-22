const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-screen flex-col md:flex-col md:overflow-hidden">
      <div className="w-20 flex-none lg:border-r">{/* SideNav */}</div>

      <div className="mx-auto mt-12 w-full max-w-7xl flex-1 flex-grow sm:p-6 md:mt-0 md:overflow-y-auto md:p-12">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
