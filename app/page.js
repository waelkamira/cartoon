import HomePage from '../components/HomePage';
export const runtime = 'edge';
export default function Home() {
  return (
    <div className="relative w-full flex justify-center rounded-lg">
      <main className="flex items-start justify-center sm:rounded-3xl overflow-hidden h-fit w-full">
        <HomePage />
        {/* <form action="/api/pay" method="POST" className="absolute z-50 top-0">
          <input type="submit" value="Buy" />
        </form> */}
      </main>
    </div>
  );
}
