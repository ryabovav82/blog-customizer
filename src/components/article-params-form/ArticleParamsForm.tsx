import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Select } from 'components/select';
import { useState } from 'react';
import { RadioGroup } from 'components/radio-group';

interface ArticleParamsFormProps {
	mainState: ArticleStateType;
	setMainState: (param: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	mainState,
	setMainState,
}: ArticleParamsFormProps) => {
	const formStateData = {
		fontFamily: mainState.fontFamilyOption,
		fontSize: mainState.fontSizeOption,
		fontColor: mainState.fontColor,
		backgroundColor: mainState.backgroundColor,
		contentWidth: mainState.contentWidth,
	};

	const formStateDataReset = {
		fontFamily: fontFamilyOptions[0],
		fontSize: fontSizeOptions[0],
		fontColor: fontColors[0],
		backgroundColor: backgroundColors[0],
		contentWidth: contentWidthArr[0],
	};

	const [formState, setFormState] = useState(formStateData);

	function resetState() {
		setFormState(formStateDataReset);
	}

	return (
		<>
			<ArrowButton />
			<aside className={styles.container}>
				<form className={styles.form}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						onChange={(selected) => {
							setFormState({
								...formState,
								fontColor: selected,
							});
						}}
						selected={formState.fontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						onChange={(changed) => {
							setFormState({
								...formState,
								fontSize: changed,
							});
						}}
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSize}
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
