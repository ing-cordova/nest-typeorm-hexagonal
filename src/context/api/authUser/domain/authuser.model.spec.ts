import { AuthUser } from './authuser.model';
import { classToPlain } from 'class-transformer';

describe('AuthUser Model', () => {
  it('should create an instance of AuthUser', () => {
    // Arrange: Crear un nuevo usuario con los valores dados
    const authUser = new AuthUser();
    authUser.id = 1;
    authUser.username = 'testuser';
    authUser.email = 'testuser@example.com';
    authUser.password = 'password123';

    // Assert: Verificar que las propiedades están asignadas correctamente
    expect(authUser).toBeInstanceOf(AuthUser);
    expect(authUser.id).toBe(1);
    expect(authUser.username).toBe('testuser');
    expect(authUser.email).toBe('testuser@example.com');
    expect(authUser.password).toBe('password123');
  });

  it('should exclude the password field when transformed to plain object', () => {
    // Arrange: Crear un nuevo usuario
    const authUser = new AuthUser();
    authUser.id = 1;
    authUser.username = 'testuser';
    authUser.email = 'testuser@example.com';
    authUser.password = 'password123';

    // Act: Transformar la entidad a un objeto plano (plain object)
    const plainUser = classToPlain(authUser);

    // Assert: Verificar que el campo password está excluido
    expect(plainUser).toEqual({
      id: 1,
      username: 'testuser',
      email: 'testuser@example.com',
    });
    expect(plainUser).not.toHaveProperty('password');
  });
});
