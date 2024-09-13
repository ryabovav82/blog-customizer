import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'components/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { FormEvent, useRef, useState } from 'react';
import { Text } from 'components/text';
import clsx from 'clsx';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';

interface ArticleParamsFormProps {
	mainState: ArticleStateType;
	setMainState: (param: ArticleStateType) => void;
}
export const ArticleParamsForm = ({ setMainState }: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState(defaultArticleState);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const rootRef = useRef(null);
	const formRef = useRef(null);

	function resetState() {
		setFormState(defaultArticleState);
	}

	const handlerSubmit = (event: FormEvent) => {
		event.preventDefault();
		setMainState({
			...formState,
			fontFamilyOption: formState.fontFamilyOption,
			fontSizeOption: formState.fontSizeOption,
			fontColor: formState.fontColor,
			backgroundColor: formState.backgroundColor,
			contentWidth: formState.contentWidth,
		});
		setIsMenuOpen(!isMenuOpen);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onClose: () => setIsMenuOpen(false),
		onChange: setIsMenuOpen,
	});

	return (
		<>
			<ArrowButton onClick={setIsMenuOpen} isOpen={isMenuOpen} />
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}
				ref={rootRef}>
				<form className={styles.form} onSubmit={handlerSubmit} ref={formRef}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						onChange={(selected) => {
							setFormState({
								...formState,
								fontFamilyOption: selected,
							});
						}}
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						onChange={(changed) => {
							setFormState({
								...formState,
								fontSizeOption: changed,
							});
						}}
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='Размер шрифта'
					/>
					<Select
						onChange={(selected) => {
							setFormState({
								...formState,
								fontColor: selected,
							});
						}}
						selected={formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						onChange={(selected) => {
							setFormState({
								...formState,
								backgroundColor: selected,
							});
						}}
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						onChange={(selected) => {
							setFormState({
								...formState,
								contentWidth: selected,
							});
						}}
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button onClick={resetState} title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
