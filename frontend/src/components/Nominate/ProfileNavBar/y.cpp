#include<iostream>
#include<string>
#include<vector>
#include<set>
#include<algorithm>
#include<set>
using namespace std;


/*
 * //
 */
 bool compare (vector<int> a, vector<int> b){
 	return a.size()<b.size();
 }
int findMaxHappyFrnd (int numOfFriends, vector<vector<int> > choiceList, int numN, int numM)
{
    vector<vector<int>> ans(numOfFriends, vector<int>(numN*numM+1, 0));
    vector<int> y(numOfFriends,0);
    vector<multiset<int>> v;
    y[0] = 1;
    for(int i=0; i<(int)choiceList[0].size(); i++){
        ans[0][choiceList[0][i]]++;
        v[0].insert(i);
    }
    for(int i=1; i<numOfFriends; i++){
        for(int j=0; i<(int)choiceList[i].size(); j++){
            int pa = ans[i-1][choiceList[i][j]];
            auto x = v[i-1].find(pa);
            if(x != v[i-1].end())
            v[i-1].erase(x);
            auto a = v[i-1].end();
            a--;
            ans[i][choiceList[i][j]] = max(pa, *a+1);
            v[i-1].insert(pa);
        }
        for(int j=0; j<numN*numM+1; j++){
            auto a = v[i-1].end();
            a--;
            if(ans[i][j] == 0){
                ans[i][j] = *a;
            }
            v[i].insert(ans[i][j]);
        }
    }
    auto x = v[numOfFriends-1].end();
    x--;
    return *x; 
}

int main()
{
    //input for numOfFriends
	int numOfFriends;
	cin >> numOfFriends;
	
	//input for choiceList
	vector<vector<int> > choiceList;
	for ( int idx = 0; idx < numOfFriends; idx++ )
	{
	    int m;
	    cin>>m;
		vector<int> temp_vector;
		for ( int jdx = 0; jdx < m; jdx++ )
		{
			int temp;
			cin >> temp;
			temp_vector.push_back(temp);
		}
		choiceList.push_back(temp_vector);
	}
	
	//input for numN
	int numN;
	cin >> numN;
	
	//input for numM
	int numM;
	cin >> numM;
	
	
    int result = findMaxHappyFrnd(numOfFriends, choiceList, numN, numM);
	cout << result;
	
	
    return 0;
}
