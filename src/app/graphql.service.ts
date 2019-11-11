
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { Comment } from './types/Comment';
import { Item } from './types/todoAdd';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  public owners: Item[];
  public owner: Item;
  public createdOwner: Item;
  public updatedOwner: Item;
 
  constructor(private apollo: Apollo, httpLink: HttpLink) {
    // apollo.create({
    //   link: httpLink.create({ uri: 'https://api.hypi.app/graphql' }),
    //   cache: new InMemoryCache()
    // })

    const http = httpLink.create({uri: 'https://api.hypi.app/graphql'});

    const authLink = new ApolloLink((operation, forward) => {
      // Get the authentication token from local storage if it exists
    //   const token = localStorage.getItem('token');
    let token = 'eyJhbGciOiJSUzI1NiJ9.eyJoeXBpLmluc3RhbmNlIjoie1wicmVhbG1cIjpcInJlZGNyaXhcIixcIm5hbWVcIjpcInN0b3JlXCIsXCJyZWxlYXNlXCI6XCJsYXRlc3RcIixcImh5cGlcIjpudWxsfSIsImh5cGkubG9naW4iOnRydWUsImh5cGkudXNlcm5hbWUiOiJjb250YWN0QHJlZGNyaXguY29tIiwiaHlwaS5lbWFpbCI6ImNvbnRhY3RAcmVkY3JpeC5jb20iLCJhdWQiOiJyZWRjcml4IiwiaWF0IjoxNTcyNTk1OTQwLCJleHAiOjE1NzUxODc5NDAsInN1YiI6IjE0ZDU1MGM4LWNiMzItNDVmNi1hM2M0LWZhY2EyMTQ2MmU0ZCIsIm5iZiI6MTU3MjU5NTk0MH0.j19WdN8aQ_ijo8ZTurgpFdpyk2MJz3lpTSBjTGGErpTYAN-ilNyimw2so3nmKQGaErwFZp0DisOxeKPzdn49UUlvoF3BwSn2gJ5SGHAmiFxxvCg6TYYGqxKwYi7rm6JUN5IlZ0gfXbgSll9DN_RTEUy3P1MGE1lU7azjiVtDtqnxo53z4iRebvSw7DNx495jf_fGo6CkaVj7ZfvpB-ZPMlwiqjLI92kcdUPHbpi2pdk-nCfg4xzW78RWfZkyzIr6_VhL9CGeHKWjERnQXEixASLZuZPfSbiXmfRBd27dgAHbNz2TvLehGJ6PgeKzapBE2rXl4d9OThotCXn2ZtGmdA';
    
    // Use the setContext method to set the HTTP headers.
      operation.setContext({
          headers: {
              'Authorization': token ? `Bearer ${token}` : '',
              'hypi-domain' : 'apiservice.com',
              'Content-Type': 'application/json'
          }
      });

      // Call the next link in the middleware chain.
      return forward(operation);
    });

    apollo.create({
      link: authLink.concat(http),
      cache: new InMemoryCache()
    });


    
  }

  public addListItem = (formdata) =>{
    return this.apollo.mutate({
      mutation: gql`mutation CreateItem($items: [ItemInput!]!) {
        createItem(values: $items) {
          slug
          title
          description
          start
          end
          due
          comments {
            content
            hypi{...hypi}
            replies {
              content
              hypi{...hypi}
            }
          }
          hypi {
            ...hypi
          }
        }
      }
       
      fragment hypi on Hypi {
        id
        pagingToken
        created
        updated
        createdBy
        instance
      }`,
      variables:{
        "items": [
          {

            "slug": "dfsdfsd",
            "title": formdata.name,
            "description": "df",
            "start": "2019-10-08T16:00:00Z",
            "end": "2019-15-08T16:00:00Z",
            "comments": [
              {
                "content": "dffd",
                "replies": [
                  {
                    "content": "No, this is a good todo"
                  }
                ]
              }
            ]
          }
        ]
      },
    }) 

  }

  

  public get_AllTasks = () => {
    return this.apollo.watchQuery({
      query: gql`query FindTask($query: String!) {
        findTask(arcql: $query) {
           id
           taskname
           description
           start
           end
           duration
           status
           subtasks {
               id
               taskname
               description
               start
               end
               duration
               status
               hypi{...hypi}
               comments {
                   content
                   hypi{...hypi}
                   replies {
                       content
                       hypi{...hypi}
                   }
               }
                
               }
               
               hypi {
                       ...hypi
               }
       }
       }
        
       fragment hypi on Hypi {
         id
         pagingToken
         created
         updated
         createdBy
         instance
       }`,
      variables: {
        "query": "*"
      },
    }) .valueChanges
  }

  

  public Add_New_Task = (Data_) =>{
    return this.apollo.mutate({
      mutation: gql`mutation CreateTask($tasks: [TaskInput!]!) {
        createTask(values: $tasks) {
          id
          taskname
          description
          start
          end
          duration
          status
          hypi {
              id
          }
          subtasks {
              id
              taskname
              description
              start
              end
              duration
              status
              hypi{...hypi}
              comments {
                  content
                  hypi{...hypi}
                  replies {
                      content
                      hypi{...hypi}
                  }
              }
               
              }
              
              hypi {
                      ...hypi
              }
      }
      
      }
       
      fragment hypi on Hypi {
        id
        pagingToken
        created
        updated
        createdBy
        instance
      }`,
      variables:{
        "tasks": Data_
      },
    }) 

  }


  public delete_Task = (ID_) =>{
    console.log('=============='+ID_.hypi.id);
    
    return this.apollo.mutate({
      mutation: gql`mutation DeleteTask($tasks :String)   {
        deleteTask( arcql:$tasks )  {
          id
          taskname
          description
          start
          end
          duration
          status
          hypi {
              id
          }
          subtasks {
              id
              taskname
              description
              start
              end
              duration
              status
              hypi{...hypi}
              comments {
                  content
                  hypi{...hypi}
                  replies {
                      content
                      hypi{...hypi}
                  }
              }
               
              }
              
              hypi {
                      ...hypi
              }
      }
      
      }
       
      fragment hypi on Hypi {
        id
        pagingToken
        created
        updated
        createdBy
        instance
      }`,
      variables:{
        "tasks": "hypi.id = '"+ID_.hypi.id+"'"
       },
    }) 

  }

}