import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users =  [
        {
            "id": 1,
            "name": "Omolola Akinmegha",
            "email":"lola@gmail.com",
            "role": "INTERN",
        },
        {
            "id": 2,
            "name": "Hephzibah Akinmegha",
            "email":"hephzibah@gmail.com",
            "role": "INTERN",
        },
        {
            "id": 3,
            "name": "Temitope Akinmegha",
            "email":"tope@gmail.com",
            "role": "INTERN",
        },
        {
            "id": 4,
            "name": "Esther Akinmegha",
            "email":"lola@gmail.com",
            "role": "INTERN",
        }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role)
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        return user;
    }

    create(user: {name: string, email: string, role: 
        'INTERN' | 'ENGINEER' | "ADMIN"}) {
            // generate random Ids since we are not connected to the database
            const  usersByHighestId = [...this.users].sort((a,b) => b.id - a.id)
            const newUser = {
                id: usersByHighestId[0].id + 1,
                ...user
            }
            this.users.push(newUser)
            return newUser
        }

        update(id: number, updatedUser: { name?: string, email?:
        string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
            this.users = this.users.map(user => {
                if(user.id === id) {
                return {...user, ...updatedUser}
            }
            return user
        })

        return this.findOne(id)
        }

        delete(id: number) {
         const removedUser = this.findOne(id)

         this.users = this.users.filter(user => user.id !== id)
         return removedUser
        }

}