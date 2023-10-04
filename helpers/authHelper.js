import bcrypt from 'bcrypt'

export async function hashPassword(password)
{
    try {
        const hashedPassword = await bcrypt.hash(password,10)    
        return hashedPassword
    } catch (error) {
        console.log(`Hash password error : ${error}`)
    }
}

export async function comparePassword(password,hashedPassword)
{
    try {  
        return bcrypt.compare(password,hashedPassword)
    } catch (error) {
        console.log(`Compare hash password error : ${error}`)
    }
}