import { TaskProvider } from "@/src/context/TaskContext";

export default function App({ Component, pageProps }) {
  return (
    <TaskProvider>
      <Component {...pageProps} />
    </TaskProvider>
  );
}
