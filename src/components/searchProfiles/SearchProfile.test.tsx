import { render, RenderResult, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { UserData, GroupSearchFormData, UserSearchProfiles } from 'types/index';
import { store } from 'modules/index';
import { setUser } from 'modules/user';
import SearchProfile from 'components/searchProfiles/SearchProfile';
const newUser: UserData = {
    firstName : 'Test',
    lastName : 'Test',
    uid:'user_abc',
    userId:'user_efg',
    displayname: 'TDD',
    email: 'test@test.com',
    photoURL: 'photoURL',
    gender: 'male',
    age: 25,
    levelOfExperience: 3,
    interests: ['Hiking'],
    description: 'TDD testing',
  };
  const searchGroup: GroupSearchFormData = {
    interest: 'Hiking',
    age: [28],
    gender: 'female',
    levelOfExperience: [8],
    
  };
  const renderSearchResultGroup = (): RenderResult =>
  render(
    <Provider store={store}>
      <SearchProfile/>
    </Provider>
  );
  beforeEach(() => {
    store.dispatch(setUser(newUser));
  });
  describe('<SearchProfile />', () => {
    test('user profile search results', () => {
      renderSearchResultGroup();
      let searchResult = screen.getAllByText('User profile Search Results');
      expect(searchResult).toBeInTheDocument();
    });
    test('user profile result is empty', () => {
        renderSearchResultGroup();
        let emptyResult = screen.getAllByText(
          'There are no available user profile matching . Please modify your criteria to find a search.'
        )[0];
        expect(emptyResult).toBeInTheDocument();
      });
      test('When user have matching profiles, display list of users', () => {
        let searchProfileList = Object.assign({}, newUser);
        let members =
          {
            name: 'test member',
            photoURL: 'test',
            uid: 'uid_abc',
            userId: 'userId_efg',
           
          } 
        renderSearchResultGroup();
        let groupMembers = screen.getByTestId('group-members-avatar-search-result');
        expect(groupMembers).toBeInTheDocument();
      });
    });