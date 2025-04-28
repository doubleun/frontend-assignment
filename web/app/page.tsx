import { ItemList, SelectedList } from '@/components/modules';
import { Providers } from '@/components/provider';
import { mockList } from '@/constants/items';

export default function Home() {
  return (
    <main>
      <Providers>
        <section className="flex justify-stretch gap-8 p-4">
          <ItemList type="ALL" items={mockList} />
          <SelectedList />
        </section>
      </Providers>
    </main>
  );
}
