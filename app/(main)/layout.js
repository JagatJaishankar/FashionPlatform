import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QuickViewModal from "@/components/ui/QuickViewModal";

export default function MainLayout({ children }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      {children}
      <Footer />
      <QuickViewModal />
    </>
  );
}
