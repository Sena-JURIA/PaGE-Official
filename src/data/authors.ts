import type { Author } from '../types/Author';
// 画像を直接 import してバンドルに含め、パス解決問題を防ぐ

export const authors: Record<string, Author> = {
  yes_antikiss: {
    id: 'yes_antikiss',
    name: 'yes',
    bio: 'AtCoder緑色。日々頑張っています',
    avatarUrl: '../assets/author_icon/yes_antikiss.png',
    xUrl: 'https://x.com/yes_oecu',
  },
  sena: {
    id: 'sena',
    name: '*Sena',
    bio: 'PaGE代表',
    avatarUrl: '../assets/author_icon/sena.jpg',
    xUrl: 'https://x.com/04_oralsena',
  },
  // 他の著者をここに追加
};
