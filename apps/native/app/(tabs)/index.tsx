import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type MetricSummary = {
  key: string;
  label: string;
  value: number;
  change: number;
  unit?: string;
};

type MetricsSummaryResponse = {
  generatedAt: string;
  totals: MetricSummary[];
};

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8000';

export default function HomeScreen() {
  const [summary, setSummary] = useState<MetricsSummaryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        setError(null);
        setLoading(true);

        const response = await fetch(`${API_BASE_URL}/metrics/summary`);

        if (!response.ok) {
          throw new Error('Failed to load metrics summary');
        }

        const payload = (await response.json()) as MetricsSummaryResponse;
        setSummary(payload);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    void loadSummary();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Metrics summary</Text>
          <Text style={styles.subtitle}>{API_BASE_URL}/metrics/summary</Text>
        </View>

        {loading ? (
          <View style={styles.stateRow}>
            <ActivityIndicator />
            <Text style={styles.stateText}>Loading...</Text>
          </View>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : summary ? (
          <View style={styles.card}>
            <Text style={styles.label}>Generated at</Text>
            <Text style={styles.value}>{new Date(summary.generatedAt).toLocaleString()}</Text>
            <View style={styles.divider} />
            {summary.totals.slice(0, 3).map((metric) => (
              <View key={metric.key} style={styles.metricRow}>
                <Text style={styles.metricLabel}>{metric.label}</Text>
                <Text style={styles.metricValue}>
                  {metric.value}
                  {metric.unit ?? ''}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.stateText}>No data available.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 24,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  stateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stateText: {
    fontSize: 16,
    color: '#444444',
    marginLeft: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#B00020',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  label: {
    fontSize: 12,
    color: '#777777',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  value: {
    fontSize: 16,
    color: '#111111',
    marginTop: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 12,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  metricLabel: {
    fontSize: 15,
    color: '#333333',
  },
  metricValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111111',
  },
});
