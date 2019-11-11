
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { Comment } from './types/Comment';
import { Item } from './types/todoAdd';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { config } from './config';

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
    const http = httpLink.create({uri: config.uri});

    const authLink = new ApolloLink((operation, forward) => {
      // Get the authentication token from local storage if it exists
    //   const token = localStorage.getItem('token');
   let token=config.token;
    // Use the setContext method to set the HTTP headers.
      operation.setContext({
          headers: {
              'Authorization': token ? `Bearer ${token}` : '',
              'hypi-domain' : config.domain,
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