import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

export interface Movie {
  id: string;
  title: string;
  director: string;
  year: number;
  rating: number;
  poster: string;
  watched: boolean;
}

export interface MovieCardProps {
  movie: Movie;
  onSelect: (id: string) => void;
  layout?: 'row' | 'poster';
}

function MovieCard({ movie, onSelect, layout = 'row' }: MovieCardProps) {
  const rating = Number(movie.rating).toFixed(1);

  if (layout === 'poster') {
    return (
      <Pressable style={styles.posterCard} onPress={() => onSelect(movie.id)}>
        <View>
          <Image
            source={{ uri: movie.poster }}
            style={styles.posterImage}
            resizeMode="cover"
          />

          <View style={styles.ratingBadge}>
            <Text style={styles.badgeText}>⭐ {rating}</Text>
          </View>

          {movie.watched && (
            <View style={styles.watchedChip}>
              <Text style={styles.badgeText}>✓ Đã xem</Text>
            </View>
          )}
        </View>
        <Text style={styles.posterTitle} numberOfLines={2}>
          {movie.title}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable style={styles.rowCard} onPress={() => onSelect(movie.id)}>
      <Image
        source={{ uri: movie.poster }}
        style={styles.rowPoster}
        resizeMode="cover"
      />
      <View style={styles.rowInfo}>
        <Text style={styles.rowTitle} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.rowSub}>
          {movie.director} · {movie.year}
        </Text>
        <Text style={styles.rowSub}>⭐ {rating}</Text>
        <Text style={styles.rowStatus}>
          {movie.watched ? '✅ Đã xem' : '🎬 Chưa xem'}
        </Text>
      </View>
    </Pressable>
  );
}

export default React.memo(MovieCard);

const styles = StyleSheet.create({
  rowCard: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  rowPoster: {
    width: 70,
    height: 105,
    borderRadius: 6,
    backgroundColor: '#ddd',
  },
  rowInfo: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  rowTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  rowSub: { fontSize: 14, color: '#555', marginBottom: 2 },
  rowStatus: { fontSize: 14, marginTop: 4 },

  posterCard: { width: '100%' },
  posterImage: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  watchedChip: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#2e9e4f',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  posterTitle: { fontSize: 14, fontWeight: '600', marginTop: 6 },
});
