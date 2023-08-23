import {PlayCircleOutlined} from '@ant-design/icons';
import Image from 'next/image';
import {MusicProps} from '@/props/music-props';
import {useContext} from 'react';
import {MusicContext, MusicContextType} from '@/context/music-context';
import {AppContext, AppContextType} from '@/context/app-context';
import {UserContext, UserContextType} from '@/context/user-context';
import '../../styles/music.css';
import {postData} from '@/helpers/axiosClient';
export default function HistoryCard(params: MusicProps) {
	const {imageMusic, mucisId, singerName, musicSrc, musicName, category, timeFormat, index, type} = params;
	const musicContext = useContext(MusicContext) as MusicContextType;
	const {setPlaying, clearPlayer, setIsPlaying, playing} = musicContext;

	const appContext = useContext(AppContext) as AppContextType;
	const {isActiveHeader, isActivePlaylist} = appContext;

	const userContext = useContext(UserContext) as UserContextType;
	const {user} = userContext;
	return (
		<div className='history-card p-4 rounded-xl bg-[var(--light-gray)] relative overflow-hidden flex items-center justify-start'>
			<div
				onClick={() => {
					if (playing.mucisId !== mucisId) {
						clearPlayer();
						setPlaying({
							imageMusic,
							mucisId,
							singerName,
							musicSrc,
							musicName,
							category,
							timeFormat,
							index,
							type,
						});
						setIsPlaying(true);
					}
				}}
				className='play absolute w-[50px] h-[50px] cursor-pointer bg-[var(--light-gray)] rounded-full text-[var(--text-primary)] flex items-center justify-center bottom-3 right-3 '
			>
				<PlayCircleOutlined className='text-[32px]' />
			</div>
			<div className='flex items-center justify-start min-w-[92px] '>
				<Image
					src={imageMusic}
					alt='Song image'
					width={92}
					height={92}
					className='w-[92px] h-[92px] rounded-full'
				/>
			</div>
			<div className='flex flex-col ml-4 overflow-hidden'>
				<div>
					<h2 className='text-[22px] capitalize font-[Bungee] mb-2 whitespace-nowrap overflow-hidden'>{musicName}</h2>
				</div>
				<div className='rounded-xl overflow-hidden'>
					<span className='block w-fit py-2 px-4 bg-[var(--text-primary)] rounded-xl text-[var(--background)] whitespace-nowrap overflow-hidden'>
						{singerName}
					</span>
				</div>
			</div>
		</div>
	);
}
