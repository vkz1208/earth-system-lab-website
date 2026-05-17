export const metadata = {
  title: 'Admin | Earth System Lab',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Edit Mode Indicator — 叠加在 root layout 的 Navbar/Footer 之上 */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-gradient-to-r from-earth-green via-earth-green-soft to-earth-green" />
      <div className="fixed top-3 right-3 z-[60] px-3 py-1.5 bg-earth-green-deep text-white text-xs rounded-full shadow-lg flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
        编辑模式
      </div>
      {children}
    </>
  );
}
