import { UserProfile } from './userprofile.model';
import { classToPlain } from 'class-transformer';

describe('UserProfile Model', () => {
  it('should create an instance of UserProfile', () => {
    // Arrange: Crear un nuevo usuario con los valores dados
    const userProfile = new UserProfile();
    userProfile.id = 1;
    userProfile.username = 'testuser';
    userProfile.email = 'testuser@example.com';
    userProfile.password = 'password123';

    // Assert: Verificar que las propiedades están asignadas correctamente
    expect(userProfile).toBeInstanceOf(UserProfile);
    expect(userProfile.id).toBe(1);
    expect(userProfile.username).toBe('testuser');
    expect(userProfile.email).toBe('testuser@example.com');
    expect(userProfile.password).toBe('password123');
  });

  it('should exclude the password field when transformed to plain object', () => {
    // Arrange: Crear un nuevo usuario
    const userProfile = new UserProfile();
    userProfile.id = 1;
    userProfile.username = 'testuser';
    userProfile.email = 'testuser@example.com';
    userProfile.password = 'password123';

    // Act: Transformar la entidad a un objeto plano (plain object)
    const plainUser = classToPlain(userProfile);

    // Assert: Verificar que el campo password está excluido
    expect(plainUser).toEqual({
      id: 1,
      username: 'testuser',
      email: 'testuser@example.com',
    });
    expect(plainUser).not.toHaveProperty('password');
  });
});
