import mldt from '../../assets/images/image.webp';
import viola from '../../assets/images/無題186_20250821154701.png';
import kienana from '../../assets/images/無題203_20250912171025.png';
import type { Game } from '../components/types';

export const games: Game[] = [
  {
    id: 'mldt',
    title: "小企画「Miku's Lyric Dive Tour」",
    description: 'ボカロをテーマにしたリズムゲーム！',
    imageUrl: mldt,
    detail: {
      description:
        'ボカロの歌詞がノーツになる！新感覚リズムゲーム。<br>流れてくる歌詞に合わせてキーを叩き、ハイスコアを目指そう！<br>簡単操作で誰でも楽しめます。',
      credits: 'PaGE 小企画チーム',
    },
  },
  {
    id: 'exhibition',
    title: '個人展覧会',
    description:
      '「ゔぃお・ら・るなてぃっく！」をはじめとし、メンバーが自ら企画・制作したゲームを展示！',
    imageUrl: viola,
    detail: {
      description:
        'PaGEメンバーが自由に制作した個性豊かなゲームが大集合！<br>あなたのお気に入りの一作を見つけてみませんか？<br><br><strong>【展示作品例】</strong><ul><li>寝屋川ドライビングスクール タイアップゲーム: あの教習所がまさかのゲーム化！？安全運転で卒業を目指せ！</li><li>ゔぃお・ら・るなてぃっく！: 舞台は何章でも続く。「あなた」の選択によって</li><li>その他、多数のゲームを展示予定！</li></ul>',
      credits: 'PaGEメンバー有志',
    },
  },
  {
    id: 'kienana',
    title: '全体企画「消えた音色と七不思議」',
    description: '音楽×謎解きの新感覚ミステリーゲーム。現地にて体験可能！',
    imageUrl: kienana,
    detail: {
      description: '<strong class="horror-text-pulse">「その音楽室の扉を開けたら、もう、帰れない。」</strong><br><br>解体を待つ旧棟に眠る七不思議「音楽室の神隠し」。オカルト研究会の仲間たちと挑む最後の夏夜。<br>単なる噂では済まされない恐怖の真相が、あなたを待っている…。',
      credits: 'PaGE 全体企画チーム',
    },
  },
];

export const getGameById = (id: string | undefined) => {
  if (!id) return undefined;
  return games.find((game) => game.id === id);
};