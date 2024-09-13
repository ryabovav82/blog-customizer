import { CSSProperties, useState } from 'react';
import { defaultArticleState } from 'src/constants/articleProps';
import clsx from 'clsx';
import { ArticleParamsForm } from 'components/article-params-form';
import { Article } from 'components/article';
import styles from './App.module.scss';
const App = () => {
	const [mainState, setMainState] = useState(defaultArticleState);
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': mainState.fontFamilyOption.value,
					'--font-size': mainState.fontSizeOption.value,
					'--font-color': mainState.fontColor.value,
					'--container-width': mainState.contentWidth.value,
					'--bg-color': mainState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm mainState={mainState} setMainState={setMainState} />
			<Article />
		</div>
	);
};
export default App;
