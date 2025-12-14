import ThreeScene from '../components/ThreeScene';

/**
 * MIGRATION NOTE: Main page component
 * - Replaces src/index.js as the entry point
 * - Uses Next.js App Router page system
 * - Renders the Three.js scene component
 */

export default function Home() {
  return (
    <main className="main-container">
      {/* MIGRATION NOTE: ThreeScene component replaces the App component from CRA */}
      <ThreeScene />
    </main>
  );
}
