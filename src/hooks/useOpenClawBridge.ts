import { useEffect, useState, useRef } from 'react';

export function useOpenClawBridge() {
  const [status, setStatus] = useState<'CONNECTING' | 'ONLINE' | 'OFFLINE'>('CONNECTING');
  const [messages, setMessages] = useState<any[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connect = () => {
      try {
        const url = process.env.NEXT_PUBLIC_OPENCLAW_WS_URL || 'ws://localhost:18789';
        console.log('Connecting to OpenClaw:', url);
        ws.current = new WebSocket(url);

        ws.current.onopen = () => {
          console.log('OpenClaw connected');
          setStatus('ONLINE');
        };

        ws.current.onclose = () => {
          console.log('OpenClaw disconnected');
          setStatus('OFFLINE');
          setTimeout(connect, 3000); // Reconnect attempt
        };

        ws.current.onerror = (err) => {
          console.error('OpenClaw error:', err);
          setStatus('OFFLINE');
        };

        ws.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'transcript.update') {
              setMessages((prev) => [...prev.slice(-49), data]); // Keep last 50
            }
          } catch (e) {
            console.error('Error parsing WS message:', e);
          }
        };
      } catch (e) {
        console.error('WS Connection error:', e);
        setStatus('OFFLINE');
      }
    };

    connect();

    return () => {
      ws.current?.close();
    };
  }, []);

  return { status, messages };
}
