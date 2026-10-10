// App.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  FlatList,
  Alert,
  Switch,
  RefreshControl,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MovieCard, { Movie } from './components/MovieCard';

// TODO: dán URL API của BẠN (tạo trên mockapi.io) vào đây.
export const API_URL = 'https://6aca214e3115bcc958206d2b.mockapi.io/movies';

// Hàm gọi API (GET) — GIỮ NGUYÊN, không xoá.
export async function fetchMovies() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error('Gọi API thất bại: ' + res.status);
  }
  return res.json();
}

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [posterMode, setPosterMode] = useState<boolean>(false);
  const [onlyUnwatched, setOnlyUnwatched] = useState<boolean>(false);

  const loadMovies = useCallback(async (isRefresh: boolean = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(false);
    try {
      const data: Movie[] = await fetchMovies();
      setMovies(data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  const filteredMovies = useMemo(
    () => (onlyUnwatched ? movies.filter((m) => !m.watched) : movies),
    [movies, onlyUnwatched]
  );

  const handleSelect = useCallback(
    (id: string) => {
      const movie = movies.find((m) => m.id === id);
      if (movie) {
        Alert.alert(movie.title, `Đạo diễn: ${movie.director}`);
      }
    },
    [movies]
  );

  const renderBody = () => {
    if (loading) {
      return <ActivityIndicator size="large" />;
    }
    if (error) {
      return (
        <View>
          <Text style={{ color: 'red' }}>Không tải được danh sách phim.</Text>
          <Button title="Thử lại" onPress={() => loadMovies()} />
        </View>
      );
    }
    return (
      <FlatList
        key={posterMode ? 'grid' : 'list'}
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        numColumns={posterMode ? 2 : 1}
        renderItem={({ item }) => {
          const card = (
            <MovieCard
              movie={item}
              onSelect={handleSelect}
              layout={posterMode ? 'poster' : 'row'}
            />
          );
          return posterMode ? (
            <View style={{ width: '50%', padding: 6 }}>{card}</View>
          ) : (
            card
          );
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadMovies(true)}
          />
        }
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 40, color: '#666' }}>
            Không có phim nào để hiển thị.
          </Text>
        }
      />
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginVertical: 12 }}>
          Movie Watchlist
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 8 }}>Dạng poster</Text>
            <Switch value={posterMode} onValueChange={setPosterMode} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 8 }}>Chưa xem</Text>
            <Switch value={onlyUnwatched} onValueChange={setOnlyUnwatched} />
          </View>
        </View>

        {renderBody()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
