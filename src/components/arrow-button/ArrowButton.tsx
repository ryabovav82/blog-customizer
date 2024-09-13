import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
type OnClick = {
	onClick?: (state: boolean) => void;
	isOpen?: boolean | undefined;
};

export const ArrowButton = ({ onClick, isOpen }: OnClick) => {
	const handlerArrowButton = () => {
		onClick?.(!isOpen);
	};

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			onClick={(e: React.MouseEvent) => {
				e.stopPropagation();
				handlerArrowButton();
			}}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, isOpen && styles.arrow_open)}
			/>
		</div>
	);
};
