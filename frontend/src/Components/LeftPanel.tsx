import KhipuList from "./KhipuList";

interface LeftPanelProps {
  onMuseumSelect: (museum: string) => void;
  onKhipuSelect: (khipu: any) => void;
  selectedMuseum: string | null;
}

export default function LeftPanel({
  onMuseumSelect,
  onKhipuSelect,
  selectedMuseum,
}: LeftPanelProps) {
  return (
    <div>
      <KhipuList
        onMuseumSelect={onMuseumSelect}
        onKhipuSelect={onKhipuSelect}
        selectedMuseum={selectedMuseum}
      />
    </div>
  );
}
