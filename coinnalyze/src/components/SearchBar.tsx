import {SearchBar} from '@rneui/base';
import {StyleSheet} from 'react-native';
import {Theme, fontFamilies, onSurface, surface} from '../globals';
import useTheme from '../hooks/useTheme';
import SearchIcon from '../../assets/icons/search-icon.svg';

interface MySeearchBarProps {
  onChangeText?: (text: string) => any;
  value?: string;
}

export default function MySeearchBar({value, onChangeText}: MySeearchBarProps) {
  const {style, theme} = useTheme(styleDecorator);
  return (
    <SearchBar
      placeholder="Search"
      onChangeText={onChangeText}
      value={value}
      containerStyle={style.searchOuterContainer}
      inputStyle={style.searchInput}
      inputContainerStyle={style.searchInnerContainer}
      searchIcon={<SearchIcon fill={onSurface(theme)} />}
      leftIconContainerStyle={style.searchIconContainer}
    />
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    searchOuterContainer: {
      padding: 0,
      overflow: 'hidden',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderWidth: 0,
    },
    searchInnerContainer: {
      borderRadius: 16,
      backgroundColor: surface(theme),
    },
    searchInput: {
      fontSize: 14,
      fontFamily: fontFamilies.regular,
      color: onSurface(theme),
    },
    searchIconContainer: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginLeft: 0,
      marginVertical: 0,
      paddingRight: 0,
      paddingLeft: 15,
    },
  });
}
