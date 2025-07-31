import PagesLayout from "@/components/layout/pages-layout";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <PagesLayout>{children}</PagesLayout>
    )
}